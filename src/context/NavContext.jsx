import { createContext, useContext, useState } from 'react'

const NavContext = createContext({ page: 'hero', setPage: () => {} })

export function NavProvider({ children }) {
  const [page, setPage] = useState('hero')
  return (
    <NavContext.Provider value={{ page, setPage }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}
