# 利用 url 参数实现 react 路由 keep-alive

## 场景

有两个页面，一个是列表页，一个是详情页，从列表页点击项目跳转到详情页后，再点击返回按钮返回到列表页，这时候列表页会重新渲染，这个时候就需要用到 keep-alive 了。vue 中有 keep-alive 组件，react 中没有，所以要自己实现。keep-alive 也会有问题，就是详情页操作之后，列表可能不会自己刷新，需要手动去除 keep-alive，再重新添加 keep-alive，这样列表页才会重新渲染。

## 思路

在刷 v2ex 的时候，在分页的列表点击到详情之后返回，还是保留在之前的分页，发现分页参数放到了 url 的 query 里面，这个时候就想到了，可以利用 url 的 query 参数来实现 keep-alive。

## 实现

搭建 react 项目就不说了，我们直接创建两个页面，一个是列表页，一个是详情页，配合 react-router-dom 来实现路由。

首先，是列表页，我们需要用到 antd 的 Table 组件，这里就不说了，直接上代码。

```jsx
import React, { useState } from 'react'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

function generateData() {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    })
  }
  return data
}

const data = generateData()

const List = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
  })

  const handleTableChange = (pagination, filters, sorter) => {
    setPage({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  const toDetail = (key) => {
    navigate(`/detail?key=${key}`)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <a style={{ marginRight: 16 }} onClick={() => toDetail(record.key)}>
            Detail
          </a>
        )
      },
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={{
          current: page.current,
          pageSize: page.pageSize,
        }}
      />
    </>
  )
}

export default List
```

然后是详情页，非常简单，直接上代码。

```jsx
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const key = searchParams.get('key')
  return (
    <>
      <div>key:{key}</div>
    </>
  )
}

export default Detail
```

然后是路由配置，直接上代码。

```jsx
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
```

这样就实现了，点击列表页的项目，跳转到详情页，再点击返回按钮，返回到列表页，列表页重置为第一页。那么怎么把分页参数保留下来呢，参照 v2ex 的实现，我们可以把分页参数放到 url 的 query 里面，这样就可以实现了。这里我们用到了 react-router-dom 的 useSearchParams，这个 hook 可以获取到 url 的 query 参数，然后我们把分页参数放到 url 的 query 里面，这样就可以实现了。

```js
const [searchParams, setSearchParams] = useSearchParams()
// 分页参数初始值使用url上的参数，这里注意要转成数字
const current = parseInt(searchParams.get('current')) || 1
const pageSize = parseInt(searchParams.get('pageSize')) || 10
const [page, setPage] = useState({
  current: current || 1,
  pageSize: pageSize || 10,
})

// table分页改变时，更新url上的参数
const handleTableChange = (pagination, filters, sorter) => {
  setPage(pagination)
  // 可以传递函数，参数是URLSearchParams对象
  setSearchParams(
    (params) => {
      params.set('current', pagination.current)
      params.set('pageSize', pagination.pageSize)
      return params
    },
    {
      // 是否替换当前的历史记录
      replace: true,
    }
  )
}
```

这样就实现了，点击列表页的项目，跳转到详情页，再点击返回按钮，返回到列表页，列表页重置为第一页，分页参数保留下来。
