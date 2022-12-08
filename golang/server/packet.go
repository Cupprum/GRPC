package main

import (
	"fmt"
	"regexp"

	"github.com/google/gopacket"
	"github.com/google/gopacket/pcap"
)

func filterIPv4(addrs []pcap.InterfaceAddress) (pcap.InterfaceAddress, error) {
	IPv4 := "^([0-9]{1,3}\\.){3}[0-9]{1,3}(\\/([0-9]|[1-2][0-9]|3[0-2]))?$"
	matchIP4 := regexp.MustCompile(IPv4)

	for _, addr := range addrs {
		if matchIP4.MatchString(addr.IP.String()) == true {
			return addr, nil
		}
	}

	return pcap.InterfaceAddress{}, fmt.Errorf("no IPv4 address")
}

func getDevice(i string) (pcap.Interface, error) {
	devs, err := pcap.FindAllDevs()
	if err != nil {
		return pcap.Interface{}, fmt.Errorf("failed search for network devices: %w", err)
	}

	for _, dev := range devs {
		if dev.Name == i {
			return dev, nil
		}
	}

	return pcap.Interface{}, nil
}

func packetGetDevices() (map[string]string, error) {
	interfaces := make(map[string]string)

	devs, err := pcap.FindAllDevs()
	if err != nil {
		return nil, fmt.Errorf("failed search for network devices: %w", err)
	}

	for _, dev := range devs {
		i, err := filterIPv4(dev.Addresses)
		if err != nil {
			continue
		}
		interfaces[dev.Name] = i.IP.String()
	}

	return interfaces, nil
}

func packetGetDetailsOfDevice(i string) (ip string, bcast string, mask string, f uint32, err error) {
	dev, err := getDevice(i)
	if err != nil {
		err = fmt.Errorf("failed to get network devices: %w", err)
		return
	}

	addr, err := filterIPv4(dev.Addresses)
	if err != nil {
		err = fmt.Errorf("no network devices found for interface %s: %w", i, err)
		return
	}

	return addr.IP.String(), addr.Broadaddr.String(), addr.Netmask.String(), dev.Flags, nil
}

func tapIntoInterface(i string, filter string) (chan gopacket.Packet, error) {
	// Create handle
	h, err := pcap.OpenLive(i, 1600, true, pcap.BlockForever)
	if err != nil {
		err = fmt.Errorf("failed to open interface '%s': %w", i, err)
		return nil, err
	}

	// Set filter
	if err := h.SetBPFFilter(filter); err != nil {
		err = fmt.Errorf("failed to set filter '%s': %w", filter, err)
		return nil, err
	}

	return gopacket.NewPacketSource(h, h.LinkType()).Packets(), nil
}
