import { Overline } from '@/components/common/overline'
import { deadlineMetrics } from '@/lib/events-data'

export function DeadlineMetricsCard() {
  return (
    <div className="deadline-metrics">
      {deadlineMetrics.map((item) => (
        <div key={item.label}>
          <Overline>{item.label}</Overline>
          <strong>
            {item.count} <small>{item.unit}</small>
          </strong>
        </div>
      ))}
    </div>
  )
}

