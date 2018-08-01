# Basic notes on Networking

## Layer 1

Layer 1 is the physical medium.  This could be Ethernet, WiFi, etc.

### Ethernet Segment

A number of hosts sharing an electrical connection and medium.  Only one device can transmit on a given channel at a given time in a segment.  Ethernet cable
has 8 pairs and is full-duplex, so, physically, it can transmit and receive simulataneously.  However, continue reading to learn about collisions.

### Simplified Ethernet Networking History

Originally, computers were networked directly or in a ring on the same segment. Ethernet specs dictate that only one device can communicate on
a given segment at the same time.  Thus, only one device could transmit at a time and the other hosts have to wait.  The hosts need to be aware of collisions
and attempt to resend later when the segment is free.  As hosts become more data hungry and/or the size of the segment grows, collisions became more common and 
the segment is less efficient.

## Layer 2

### Switches

Switches work at layer 2 of the OSI Networking Stack.  This means that they do not route and deal only with Ethernet frames and MAC addresses.  Switches
use the traffic flowing through them to map MAC addresses to port numbers on the switch.  In doing this, they can efficiently broker
traffic through its local hosts.

If a MAC address is unknown to the switch, it will broadcast the frame to all ports.  Eventually, the host will communicate with the switch and it can
map its MAC address and become more efficient.

Multiple MACs can be associated with a single switch port.  This allows switches to be connected together and to build more complex, but efficient network
topologies. 

Switches also reduce segment collisions as each port creates a network segment.  This means that the transmit portion of the segment is always available
to the switch and the send portion is just a function of how many hosts are on that segment.  1 in the case of a host conneected directly to the switch.  A
fully switched network is collision free and can freely transmit in full-duplex mode without fear of collisions.

![Annotated OSI Networking Stack from grandmetric.com](https://www.grandmetric.com/wp-content/uploads/2018/01/Screenshot_568.png)

### Address Resolution Protocol (ARP)

This protocol allows discovery of MAC addresses for a given IP or hostname

## Layer 3

### Routers

Routers work at Layer 3 of the OSI stack and allow for internetwork communication.  They use routing tables to determine the next hop for a packet when leaving the network.

Additionally, routers allow the hosts of a local network to share an IP address via NAT (Network Address Translation).  The router will send the packet on behalf of the local
host via the shared IP and do the translation of response packets back to the local network address space for distribution to the host.

## Host (Computer) Networking

### Mail Analogy to local and remote networking

* Interoffice mail == Local Network
    * No need for a postal address. Just person, department, building, etc.
* Postal System == Routers
    * State/Zip determines the next regional postal office (the "next hop")
    * Regional post office is like NAT.  Delivering the mail the "last mile" and to the "local network"

### Simplified Networking "Algorithm"

* If using a hostname, use DNS to convert hostname to IP
* Use the host's route tables to determine the destination locality and target interface
    * This uses, among other things, the destination IP and host's subnet mask
* If it's on the same network,
    * Build the packet with the local, destination IP address
    * Use ARP to get MAC address of local host 
    * Build the frame with the MAC address of the local host
    * Send the frame to the target interface.  The switch(es) will use ethernet (layer 2 protocol) to get the frame to the right destination
* If it's on a different network,
    * Build the packet with the remore, destination IP address
    * Use ARP to get MAC address of Default Gateway for the target interface
    * Build the frame with the destination of the Default Gateway
    * Send the frame to the router
    * Router will take care of sending it to the next hop and NAT the response packet back to the host accordingly.

### Intro Article on route tables, iptables in linux

https://jvns.ca/blog/2018/07/24/ip-addresses-routing/
