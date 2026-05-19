import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import { sixAxes, sixAxisScores } from '../../data/diagnosticReport'

const radarData = sixAxes.map((axis) => ({
  axis: axis.nameKo,
  value: sixAxisScores.before[axis.id],
  fullMark: 100,
}))

export default function SixAxisRadar() {
  return (
    <div className="w-full max-w-[520px] mx-auto">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#243556" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: '#9BB5D6', fontSize: 14, fontWeight: 500 }}
          />
          <Radar
            name="Diagnostic Score"
            dataKey="value"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
