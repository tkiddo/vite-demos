import { createBrowserRouter } from 'react-router-dom'
import List from '../views/list'
import Detail from '../views/detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <List />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
])

export default router
