import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class TaskitemModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      //data.address = data.address.join(' ')
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { TextArea } = Input;

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`producerId`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('producerId', {
              initialValue: item.producerId,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`producerDbSql`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('producerDbSql', {
              initialValue: item.producerDbSql,
            })(<TextArea />)}
          </FormItem>
          <FormItem
            label={i18n.t`producerType`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('producerType', {
              initialValue: item.producerType == null ? 'com.yoyosys.mt.task.producer.DatabaseProducer	' : item.producerType,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`producerCount`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('producerCount', {
              initialValue: item.producerCount == null ? '1':item.producerCount,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`consumerId`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('consumerId', {
              initialValue: item.consumerId,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`consumerType`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('consumerType', {
              initialValue: item.consumerType == null ? 'com.yoyosys.mt.task.consumer.ElasticsearchConsumer	' : item.consumerType,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`consumerCount`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('consumerCount', {
              initialValue: item.consumerCount == null ? '4' : item.consumerCount,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={i18n.t`consumerEsIndexName`}
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('consumerEsIndexName', {
              initialValue: item.consumerEsIndexName,
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

TaskitemModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default TaskitemModal
