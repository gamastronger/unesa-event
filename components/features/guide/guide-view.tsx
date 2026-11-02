import { Overline } from '@/components/common/overline'
import { DelegationFlow } from './delegation-flow'
import { ResourceLibrary } from './resource-library'
import { PwaInstallGuide } from './pwa-install-guide'

export function GuideView() {
  return (
    <main className="subpage guide-page">
      <div className="subpage-intro">
        <Overline>DOCUMENTATION / HOW IT WORKS</Overline>
        <h1>
          Panduan untuk
          <br />
          <em>melangkah lebih jauh.</em>
        </h1>
        <p>
          Prosedur ringkas agar setiap delegasi siap berangkat dengan informasi yang tepat.
        </p>
      </div>

      <DelegationFlow />
      <ResourceLibrary />
      <PwaInstallGuide />
    </main>
  )
}

