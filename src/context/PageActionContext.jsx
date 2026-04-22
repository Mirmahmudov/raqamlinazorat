import { createContext, useContext, useState, useCallback } from 'react'

const PageActionContext = createContext(null)

export function PageActionProvider({ children }) {
  const [action, setAction] = useState(null)
  // action = { label, icon, onClick } | null

  const registerAction = useCallback((a) => setAction(a), [])
  const clearAction = useCallback(() => setAction(null), [])

  return (
    <PageActionContext.Provider value={{ action, registerAction, clearAction }}>
      {children}
    </PageActionContext.Provider>
  )
}

export function usePageAction() {
  return useContext(PageActionContext)
}
