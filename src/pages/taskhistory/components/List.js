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
    const { onDeleteItem, onEditItem, onExecuteItem, onDuplicateItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3') {
      onDuplicateItem(record.id)
    } else if (e.key === '4') {
      onExecuteItem(record.id)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, onExecuteItem, i18n, ...tableProps } = this.props
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'status',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link to={`taskHistory/${record.producerId}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>producerId</Trans>,
        dataIndex: 'producerId',
        key: 'producerId',
      },
      {
        title: <Trans>producerType</Trans>,
        dataIndex: 'producerType',
        key: 'producerType',
      },
      {
        title: <Trans>producerCount</Trans>,
        dataIndex: 'producerCount',
        key: 'producerCount',
      },
      {
        title: <Trans>producerDbSql</Trans>,
        dataIndex: 'producerDbSql',
        key: 'producerDbSql',
      },
      {
        title: <Trans>consumerId</Trans>,
        dataIndex: 'consumerId',
        key: 'consumerId',
      },
      {
        title: <Trans>consumerType</Trans>,
        dataIndex: 'consumerType',
        key: 'consumerType',
      },
      {
        title: <Trans>consumerCount</Trans>,
        dataIndex: 'consumerCount',
        key: 'consumerCount',
      },
      {
        title: <Trans>consumerEsIndexName</Trans>,
        dataIndex: 'consumerEsIndexName',
        key: 'consumerEsIndexName',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        // fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
                { key: '3', name: i18n.t`复制` },
                { key: '4', name: i18n.t`执行` },
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
        scroll={{ x: 1200 }}
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
  onExecuteItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
