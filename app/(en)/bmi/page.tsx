'use client'

import { useState } from 'react'
import { Calculator, Camera } from 'lucide-react'
import { BMICalculator } from '@/components/bmi/BMICalculator'
import { BMIGauge } from '@/components/bmi/BMIGauge'
import { BMIResults } from '@/components/bmi/BMIResults'
import { DemoBanner } from '@/components/app/DemoBanner'
import { DemoLock } from '@/components/app/DemoLock'
import { AppDownloadSection } from '@/components/app/AppDownloadSection'
import { AppDownloadModal } from '@/components/app/AppDownloadModal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

interface BMIResult {
  bmi: number
  category: string
}

export default function BMIPage() {
  const [mode, setMode] = useState<'manual' | 'camera'>('manual')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [appOpen, setAppOpen] = useState(false)

  return (
    <>
      <div className="bg-background pb-8 pt-28 sm:pt-32">
        <div className="container max-w-3xl">
          <DemoBanner label="This BMI calculator is a demo" />

          <SectionHeading
            as="h1"
            eyebrow="Wellness · Demo"
            title="A quick health snapshot"
            description="Enter your height and weight for a BMI reading and a few notes from Adrian’s kitchen. Daily tracking, body composition and camera analysis live in the app."
            className="mt-10"
            animate={false}
          />

          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setMode('manual')}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
                mode === 'manual'
                  ? 'bg-ink text-ink-foreground'
                  : 'border border-border bg-card text-foreground-muted hover:text-foreground'
              )}
            >
              <Calculator size={16} />
              Manual
            </button>
            <button
              onClick={() => {
                setMode('camera')
                setAppOpen(true)
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
                mode === 'camera'
                  ? 'bg-ink text-ink-foreground'
                  : 'border border-border bg-card text-foreground-muted hover:text-foreground'
              )}
            >
              <Camera size={16} />
              AI body scan
              <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[9px] uppercase tracking-caps text-ink">
                App
              </span>
            </button>
          </div>

          <div className="mt-8">
            {mode === 'manual' ? (
              <BMICalculator onResult={(data) => setResult(data)} />
            ) : (
              <DemoLock feature="AI body scan" blur="md">
                <div className="surface min-h-[280px] p-10 text-center">
                  <Camera size={40} className="mx-auto text-foreground-subtle" />
                  <p className="mt-4 font-display text-2xl">Point the camera</p>
                  <p className="mt-2 text-sm text-foreground-muted">
                    The app estimates composition from a short scan.
                  </p>
                </div>
              </DemoLock>
            )}
          </div>

          {result && (
            <div className="mt-10 space-y-6">
              <BMIGauge bmi={result.bmi} category={result.category} />
              <BMIResults bmi={result.bmi} category={result.category} />
              <p className="text-center text-xs text-foreground-subtle">
                BMI is a screening number, not a diagnosis. For a fuller picture of trends, waist
                measurements and chef-led menus, use the Table d&apos;Adrian app.
              </p>
            </div>
          )}
        </div>
      </div>

      <AppDownloadSection />
      <AppDownloadModal open={appOpen} onOpenChange={setAppOpen} feature="AI body scan" />
    </>
  )
}
