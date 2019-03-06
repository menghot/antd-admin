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
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  // private String id;
  // private String name;
  // private String url;
  // private String indexName;
  // private String idKey;
  // private String docType = "_doc";
  // private int retryCount = 2;
  // private Date createTime;
  // private Date updateTime;
  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props
    const columns = [
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link to={`dbseting/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: <Trans>url</Trans>,
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: <Trans>indexName</Trans>,
        dataIndex: 'indexName',
        key: 'indexName',
      },
      {
        title: <Trans>idKey</Trans>,
        dataIndex: 'idKey',
        key: 'idKey',
      },
      {
        title: <Trans>docType</Trans>,
        dataIndex: 'docType',
        key: 'docType',
      },
      {
        title: <Trans>retry</Trans>,
        dataIndex: 'retryCount',
        key: 'retryCount',
      },
      {
        title: <Trans>cTime</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>updateTime</Trans>,
        dataIndex: 'updateTime',
        key: 'updateTime',
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
  location: PropTypes.object,
}

export default List
