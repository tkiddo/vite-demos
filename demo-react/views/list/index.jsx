import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const current = parseInt(searchParams.get('current')) || 1
  const pageSize = parseInt(searchParams.get('pageSize')) || 10
  const [page, setPage] = useState({
    current: current || 1,
    pageSize: pageSize || 10,
  })

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination)
    setSearchParams(
      (params) => {
        params.set('current', pagination.current)
        params.set('pageSize', pagination.pageSize)
        return params
      },
      {
        replace: true,
      }
    )
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
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => toDetail(record.key)}>
            Detail
          </a>
          <a>Delete</a>
        </span>
      ),
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
