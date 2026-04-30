'use client';
import { motion } from 'framer-motion';
import SolutionDetailLayout, { type SvgProps, type SolutionPanel } from '@/components/SolutionDetailLayout';

const COLOR = '#FF7A00';

// ─── SVG: Circuit board + MCU + sensor nodes ─────────────────────────────────
function EmbeddedSVG({ p1, p2, p3, p4, op1, op2 }: SvgProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: '100%', maxWidth: 460 }} aria-hidden="true">
      {/* PCB board outline */}
      <motion.rect x="24" y="24" width="432" height="432" rx="12"
        stroke={COLOR} strokeWidth="2" fill="none" style={{ pathLength: p1 }} />
      {/* PCB mounting holes */}
      {[[46,46],[46,434],[434,46],[434,434]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="9" stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p1 }} />
      ))}

      {/* Central MCU chip */}
      <motion.rect x="172" y="172" width="136" height="136" rx="8"
        stroke={COLOR} strokeWidth="2.5" fill="none" style={{ pathLength: p1 }} />
      {/* Chip inner die */}
      <motion.rect x="194" y="194" width="92" height="92" rx="4"
        stroke={COLOR} strokeWidth="1.5" strokeOpacity="0.5" fill="none" style={{ pathLength: p2 }} />
      {/* Chip label */}
      <motion.g style={{ opacity: op1 }}>
        <text x="240" y="237" textAnchor="middle" fontSize="9" fontWeight="700"
          fill={COLOR} fontFamily="Inter,sans-serif" letterSpacing="1">MCU</text>
        <text x="240" y="252" textAnchor="middle" fontSize="7" fill={COLOR}
          fontFamily="Inter,sans-serif" opacity="0.6">ARM Cortex-M4</text>
      </motion.g>

      {/* Pin traces — left */}
      {[184,204,224,244,264,284].map((y,i) => (
        <motion.line key={i} x1="60" y1={y} x2="172" y2={y}
          stroke={COLOR} strokeWidth="1.2" strokeDasharray={i%2===0?"6 4":"none"} style={{ pathLength: p2 }} />
      ))}
      {/* Pin traces — right */}
      {[184,204,224,244,264,284].map((y,i) => (
        <motion.line key={i} x1="308" y1={y} x2="420" y2={y}
          stroke={COLOR} strokeWidth="1.2" strokeDasharray={i%2===0?"6 4":"none"} style={{ pathLength: p2 }} />
      ))}
      {/* Pin traces — top */}
      {[196,216,236,256,276,296].map((x,i) => (
        <motion.line key={i} x1={x} y1="60" x2={x} y2="172"
          stroke={COLOR} strokeWidth="1.2" strokeDasharray={i%2===0?"6 4":"none"} style={{ pathLength: p3 }} />
      ))}
      {/* Pin traces — bottom */}
      {[196,216,236,256,276,296].map((x,i) => (
        <motion.line key={i} x1={x} y1="308" x2={x} y2="420"
          stroke={COLOR} strokeWidth="1.2" strokeDasharray={i%2===0?"6 4":"none"} style={{ pathLength: p3 }} />
      ))}

      {/* Peripheral blocks */}
      {/* Top-left: Sensor */}
      <motion.rect x="38" y="38" width="70" height="60" rx="6"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="73" y="65" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={COLOR} fontFamily="Inter,sans-serif">SENSOR</text>
        <text x="73" y="78" textAnchor="middle" fontSize="6.5" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">I2C / SPI</text>
      </motion.g>
      {/* Top-right: Radio module */}
      <motion.rect x="372" y="38" width="70" height="60" rx="6"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op1 }}>
        <text x="407" y="65" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={COLOR} fontFamily="Inter,sans-serif">RF/BLE</text>
        <text x="407" y="78" textAnchor="middle" fontSize="6.5" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">BT5 / Zigbee</text>
      </motion.g>
      {/* Bottom-left: Power */}
      <motion.rect x="38" y="382" width="70" height="60" rx="6"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p3 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="73" y="409" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={COLOR} fontFamily="Inter,sans-serif">PMIC</text>
        <text x="73" y="422" textAnchor="middle" fontSize="6.5" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">3.3V / 5V</text>
      </motion.g>
      {/* Bottom-right: Flash */}
      <motion.rect x="372" y="382" width="70" height="60" rx="6"
        stroke={COLOR} strokeWidth="1.5" style={{ pathLength: p4 }} />
      <motion.g style={{ opacity: op2 }}>
        <text x="407" y="409" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={COLOR} fontFamily="Inter,sans-serif">FLASH</text>
        <text x="407" y="422" textAnchor="middle" fontSize="6.5" fill={COLOR} fontFamily="Inter,sans-serif" opacity="0.6">NOR 8MB</text>
      </motion.g>

      {/* Cloud uplink icon (top-centre) */}
      <motion.path
        d="M 205,52 Q 240,32 275,52 Q 288,44 298,56 Q 310,52 310,68 Q 310,80 298,80 L 185,80 Q 172,80 172,68 Q 172,56 185,52 Q 195,46 205,52 Z"
        stroke={COLOR} strokeWidth="1.5" fill="none" style={{ pathLength: p4 }} />
      {/* Uplink arrows */}
      {[220, 240, 260].map((x, i) => (
        <motion.path key={i} d={`M ${x},96 L ${x},82`}
          stroke={COLOR} strokeWidth="1.2" style={{ opacity: op2 }} />
      ))}

      {/* Signal ripples from RF block */}
      {[8, 16].map((r, i) => (
        <motion.circle key={i} cx="407" cy="68" r={26 + r}
          stroke={COLOR} strokeWidth="0.8" strokeOpacity="0.3" fill="none" style={{ opacity: op2 }} />
      ))}

      {/* Via dots on traces */}
      {[[116,184],[116,244],[116,284],[364,204],[364,264]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="4" fill={COLOR} style={{ opacity: op2 }} />
      ))}
    </svg>
  );
}

const PANELS: SolutionPanel[] = [
  {
    id: 0,
    eyebrow: 'EMBEDDED · IoT',
    headline: ['Embedded', 'Systems', '& IoT'],
    sub: 'From bare-metal firmware to edge-cloud integration.',
    body: 'We design and deliver complete embedded systems — from schematic capture and PCB layout to firmware development, driver porting, and full IoT stack integration. Every layer, fully owned by us.',
    chips: ['Bare-Metal', 'RTOS', 'Firmware', 'BSP/HAL', 'Edge Computing', 'MQTT / AMQP'],
  },
  {
    id: 1,
    eyebrow: 'HARDWARE DESIGN',
    headline: ['Silicon', 'to Board'],
    sub: 'End-to-end hardware engineering from architecture to production.',
    features: [
      { icon: '⚙️', label: 'MCU / MPU Selection', desc: 'ARM Cortex-M/A, RISC-V, ESP32, STM32, NXP i.MX series' },
      { icon: '📡', label: 'Wireless Protocols', desc: 'BLE 5, Zigbee, LoRaWAN, Wi-Fi, NB-IoT, LTE-M' },
      { icon: '🔌', label: 'Peripheral Integration', desc: 'SPI, I2C, UART, CAN, USB, Ethernet drivers' },
      { icon: '🔋', label: 'Power Management', desc: 'Ultra-low power design, duty cycling, PMIC integration' },
    ],
  },
  {
    id: 2,
    eyebrow: 'BY THE NUMBERS',
    headline: ['Field-Proven', 'Solutions'],
    sub: 'Hardware that ships and stays reliable in the field.',
    stats: [
      { value: '30+', label: 'Custom hardware designs' },
      { value: '<1%', label: 'Field return rate' },
      { value: '5yr+', label: 'Longest deployed product' },
      { value: '10+', label: 'Wireless protocols mastered' },
    ],
  },
  {
    id: 3,
    eyebrow: 'IoT PLATFORM',
    headline: ['Device to', 'Cloud'],
    sub: 'Full-stack IoT from sensor data to executive dashboard.',
    body: 'Our IoT platform connects your devices to AWS IoT Core, Azure IoT Hub, or a custom MQTT broker — with real-time telemetry, OTA firmware updates, device twin management, and cloud dashboards built in.',
    cta: { label: 'Start Your IoT Project', href: '/#contact' },
  },
];

export default function EmbeddedIoTContent() {
  return (
    <SolutionDetailLayout
      hero={{
        eyebrow: 'TRINOVTECH · SOLUTIONS',
        title: 'Embedded & IoT',
        sub: 'Complete embedded systems — from silicon design to cloud-connected firmware.',
      }}
      panels={PANELS}
      SvgComponent={EmbeddedSVG}
      accentColor={COLOR}
    />
  );
}
