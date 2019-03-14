import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@withI18n()
@connect(({ taskitem, loading }) => ({ taskitem, loading }))
class Taskitem extends PureComponent {
  render() {
    const { location, dispatch, taskitem, loading, i18n } = this.props
    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys,
    } = taskitem

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`taskitem/${modalType}`],
      title: `${
        modalType === 'create'
          ? i18n.t`Create taskitem`
          : i18n.t`Update taskitem`
      }`,
      centered: true,
      onOk(data) {
        dispatch({
          type: `taskitem/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'taskitem/hideModal',
        })
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['taskitem/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          pageNum: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'taskitem/delete',
          payload: id,
        }).then(() => {
          handleRefresh({
            pageNum:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onDuplicateItem(id) {
        dispatch({
          type: 'taskitem/duplicate',
          payload: id,
        }).then(() => {
          handleRefresh({
            pageNum:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onExecuteItem(id) {
        dispatch({
          type: 'taskitem/execute',
          payload: id,
        }).then(() => {
          console.info(id);
          // handleRefresh({
          //   page:
          //     list.length === 1 && pagination.current > 1
          //       ? pagination.current - 1
          //       : pagination.current,
          // })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'taskitem/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'taskitem/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          pageNum: 1,
        })
      },
      onAdd() {
        dispatch({
          type: 'taskitem/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'taskitem/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      }).then(() => {
        handleRefresh({
          pageNum:
            list.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
        })
      })
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Page>
    )
  }
}

Taskitem.propTypes = {
  taskitem: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Taskitem
