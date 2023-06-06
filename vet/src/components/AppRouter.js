import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import SearchResults from '../pages/SearchResults'
import { routes } from '../routes'
import { HOME_ROUTE } from '../utils/consts'

export default function AppRouter() {
  return (
    <Routes>
        {routes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component />} exact />
        )}
        <Route path='/search/*' element={<SearchResults />}/>
        <Route path='*' element={<Navigate to={HOME_ROUTE}/>} />
    </Routes>
  )
}
