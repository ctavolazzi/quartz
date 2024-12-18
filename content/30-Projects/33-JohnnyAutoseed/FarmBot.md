---
title: "FarmBot"
date: 2024-12-17
lastmod: 2024-12-17
type: project
tags:
  - automation
  - robotics
  - farming
  - open-source
status: reference
aliases:
  - FarmBot System
  - FarmBot Foundation
---
# FarmBot
>[!note] Quick Overview
>An open-source CNC farming robot that serves as the foundation for Johnny Autoseed systems. FarmBot automates the entire growing process with precision control and yields approximately 1 cup of vegetables per day per square meter.
>
>**Status**: Active Integration
>**Updated**: 2024-12-17

## What is this?
FarmBot is the core technology underlying Johnny Autoseed's automated farming capabilities. It's an open-source CNC farming robot that provides precise control over planting, watering, and monitoring of crops, with proven ROI periods ranging from 6-24 months depending on model size.

## Product Lines

### Genesis v1.7 (Current)
- Area: 1.5m x 3m (4.5m²)
- Assembly time: 3 hours
- 90% pre-assembled
- Silver anodized aluminum construction

### Genesis XL v1.7 (Current)
- Area: 3m x 6m (18m²)
- Assembly time: 4 hours
- 90% pre-assembled
- Services larger areas efficiently

### Genesis v1.8 (Coming Soon)
- Expected February shipping
- Enhanced assembly speed
- Refined appearance
- Same reliable coverage area

### Genesis XL v1.8 (Coming Soon)
- Expected February shipping
- Double width and length of v1.8
- Enhanced improvements
- Maximized growing area

## Technical Specifications

### Hardware Components
- NEMA 17 stepper motors
- TMC2130 stepper drivers
- Raspberry Pi 4B (1.5GHz quad-core)
- Farmduino v1.6 microcontroller
- IP67 rainproof USB camera
- Custom aluminum extrusion tracks
- 24V solenoid valve
- LED indicators and customizable buttons

### Performance Metrics
- Position accuracy: 2mm
- Water efficiency: Up to 70% savings
- Power usage: ~100W during operation
- Network: WiFi + Ethernet
- Input voltage: 110-220V AC

### Growing Capabilities
Based on detailed analysis of 33 common crops:
- Average yield: 0.42 cups/m²/day
- Optimal yield: 1.00 cups/m²/day (top 10 crops)
- Supports most vegetables under 0.5m height
- Ideal for leafy greens, root vegetables, and compact plants

## ROI Analysis

### Direct Costs (Monthly)
- Seeds: ~$6.00
- Water: ~$2.25
- Electricity: ~$1.03
- Total direct costs: ~$9.28

### Cost Savings
- Genesis: $45/month ($540/year)
- Genesis XL: $225/month ($2,700/year)
- Genesis MAX: $615/month ($7,380/year)

### ROI Periods
- Genesis: ~2 years
- Genesis XL: ~1 year
- Genesis MAX: ~6 months

## Integration APIs
- Web-based control interface
- Real-time monitoring
- Automated scheduling
- Custom sequence support
- Data logging and analytics

## Installation Requirements
1. Raised bed or similar infrastructure
2. Power supply (110/220V)
3. Water connection (3/4" GHT)
4. Internet connectivity
5. Basic assembly tools

## Resources & Links
### Internal Connections
- [[Johnny Autoseed]] - Main project integration
- [[Robot Gardening]] - Techniques and best practices

### External Resources
- [FarmBot Official Site](https://farm.bot)
- [Documentation](https://docs.farm.bot)
- [GitHub Repository](https://github.com/FarmBot)

---
## Connections
- **Areas**: [[Projects]] | [[Robotics]] | [[Open Source]]
- **Topics**: #robotics #farming #automation #open-source
- **Related**: [[Johnny Autoseed]] | [[Garden Automation]]

*Last updated: 2024-12-17*