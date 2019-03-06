import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'

class ABC extends PureComponent {
  render() {
    return (
      <div>
        <h3>Helloword!!!</h3>
        <a href="/hello/abc" target="_blank">
          hello
        </a>
      </div>
    )
  }
}

export default ABC
