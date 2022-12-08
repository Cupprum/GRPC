package main

import (
	"fmt"
	"log"
	"os"

	"github.com/BurntSushi/toml"
	"github.com/golang-jwt/jwt"
)

type Certificates struct {
	Certificates map[string]string
}

func getCertificates() (map[string]string, error) {
	fn := "config.toml"
	content, err := os.ReadFile(fn)
	if err != nil {
		return nil, fmt.Errorf("can not open file '%s': %w", fn, err)
	}

	var crts Certificates
	err = toml.Unmarshal(content, &crts)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal file '%s': %w", fn, err)
	}

	return crts.Certificates, nil
}

func keyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
		return nil, fmt.Errorf("algorithm should be RSA")
	}

	untypedKeyId, found := token.Header["kid"]
	if !found {
		return nil, fmt.Errorf("missing 'kid'")
	}
	keyId, ok := untypedKeyId.(string)
	if !ok {
		return nil, fmt.Errorf("'kid' is not string")
	}

	crts, err := getCertificates()
	if err != nil {
		return nil, fmt.Errorf("failed getting certificates: %w", err)
	}

	pubKeyBase64, found := crts[keyId]
	if !found {
		return nil, fmt.Errorf("no public RSA key found corresponding to key")
	}

	pubKey, err := jwt.ParseRSAPublicKeyFromPEM([]byte(pubKeyBase64))
	if err != nil {
		return nil, fmt.Errorf("failed parsing public key: %w", err)
	}

	return pubKey, nil
}

func verify(tokenString string) bool {
	token, err := new(jwt.Parser).Parse(tokenString, keyFunc)
	if err != nil {
		log.Println("could not parse token: ", err)
		return false
	}

	return token.Valid
}
