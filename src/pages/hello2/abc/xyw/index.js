import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'

class A extends PureComponent {
  render() {
    return (
      <div>
        <h3>1222Helloword!!!</h3>
        <a href="/hello/abc" target="_blank">
          hello
        </a>
      </div>
    )
  }
}

export default A
