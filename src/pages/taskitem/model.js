/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryTaskitemList,
  createTaskitem,
  removeTaskitem,
  duplicateTaskitem,
  updateTaskitem,
  executeTaskitem,
  removeTaskitemList,
} = api

export default modelExtend(pageModel, {
  namespace: 'taskitem',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/taskitem', location.pathname)) {
          const payload = {};
          payload.pageNum = location.query.pageNum || 1;
          payload.pageSize = location.query.pageSize || 10;
          //payload.pageNum = payload.page || payload.pageNum;
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryTaskitemList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(payload.pageNum) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeTaskitem, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.taskitem)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeTaskitemList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *execute({ payload }, { call, put }) {
      const data = yield call(executeTaskitem, { id: payload })
      if (data.success) {
        console.info(data);
      } else {
        throw data
      }
    },

    *duplicate({ payload }, { call, put }) {
      const data = yield call(duplicateTaskitem, { id: payload })
      if (data.success) {
        console.info(data);
      } else {
        throw data
      }
    },


    *create({ payload }, { call, put }) {
      const data = yield call(createTaskitem, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ taskitem }) => taskitem.currentItem.id)
      const newTaskitem = { ...payload, id }
      const data = yield call(updateTaskitem, newTaskitem)
      console.info(data)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
