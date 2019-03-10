/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  querytaskHistoryList,
  createtaskHistory,
  removetaskHistory,
  duplicatetaskHistory,
  updatetaskHistory,
  executetaskHistory,
  removetaskHistoryList,
} = api

export default modelExtend(pageModel, {
  namespace: 'taskhistory',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/taskhistory', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
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
      const data = yield call(querytaskHistoryList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removetaskHistory, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.taskhistory)
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
      const data = yield call(removetaskHistoryList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *execute({ payload }, { call, put }) {
      const data = yield call(executetaskHistory, { id: payload })
      if (data.success) {
        console.info(data);
      } else {
        throw data
      }
    },

    *duplicate({ payload }, { call, put }) {
      const data = yield call(duplicatetaskHistory, { id: payload })
      if (data.success) {
        console.info(data);
      } else {
        throw data
      }
    },


    *create({ payload }, { call, put }) {
      const data = yield call(createtaskHistory, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ taskhistory }) => taskhistory.currentItem.id)
      const newtaskHistory = { ...payload, id }
      const data = yield call(updatetaskHistory, newtaskHistory)
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
