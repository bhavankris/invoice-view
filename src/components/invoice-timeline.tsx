import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { InvoiceVersion } from "../types/invoice"

interface InvoiceTimelineProps {
  versions: InvoiceVersion[]
}

export function InvoiceTimeline({ versions }: InvoiceTimelineProps) {
  return (
    <div className="space-y-8">
      {versions.map((version, index) => (
        <div key={version.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background">
              {version.status === 'accepted' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              {version.status === 'failed' && <XCircle className="h-5 w-5 text-red-500" />}
              {version.status === 'processing' && <Clock className="h-5 w-5 text-yellow-500" />}
            </div>
            {index !== versions.length - 1 && <div className="h-full w-px bg-border" />}
          </div>
          <div className="space-y-2 pb-8">
            <div className="flex items-center gap-2">
              <div className="font-medium">Version {version.version}</div>
              <div className="text-sm text-muted-foreground">UTR: {version.utr}</div>
              <div className="text-sm text-muted-foreground">{version.timestamp}</div>
            </div>
            {version.validationErrors && (
              <div className="space-y-2">
                {version.validationErrors.map((error, i) => (
                  <div
                    key={i}
                    className="rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground"
                  >
                    <span className="font-medium capitalize">{error.type}</span> Validation Error:{" "}
                    {error.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

