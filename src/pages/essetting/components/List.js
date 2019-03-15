import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        // render: (text, record) => (
        //   <Link to={`essetting/${record.id}`}>{text}</Link>
        // ),
      },
      {
        title: '配置名称',
        dataIndex: 'name',
        // sorter: true,
        // sortOrder: 'ascend',
        key: 'name',
      },
      {
        title: 'url',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '默认文档类型',
        dataIndex: 'docType',
        key: 'docType',
      },
      {
        title: '默认重试次数',
        dataIndex: 'retryCount',
        key: 'retryCount',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'operation',
        // fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: '更新' },
                { key: '2', name: '删除' },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1000 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
