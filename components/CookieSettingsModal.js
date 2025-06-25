import { useCookieConsent } from '@/context/CookieConsentContext'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function CookieSettingsModal() {
  const { showSettings, setShowSettings, savePrefs, prefs } = useCookieConsent()
  const [localPrefs, setLocalPrefs] = useState(prefs)

  const toggle = key => {
    setLocalPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    savePrefs(localPrefs)
    setShowSettings(false)
  }

  return (
    <Transition show={showSettings} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setShowSettings(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">Cookie Preferences</Dialog.Title>
            <p className="text-sm text-gray-600 mb-6">
              Select which types of cookies you allow. You can always change this later.
            </p>

            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked disabled />
                <span className="text-sm text-gray-700">
                  Necessary cookies (always enabled)
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localPrefs.analytics}
                  onChange={() => toggle('analytics')}
                />
                <span className="text-sm text-gray-700">
                  Analytics cookies
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localPrefs.marketing}
                  onChange={() => toggle('marketing')}
                />
                <span className="text-sm text-gray-700">
                  Marketing cookies
                </span>
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm text-gray-700"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-green-700 text-white rounded hover:bg-green-800"
                onClick={handleSave}
              >
                Save Preferences
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
