import React from 'react'
import Select from 'react-select'
import { TAPi18n } from 'meteor/tap:i18n'
import { Users } from '../../api/users'

export class UserPicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      query: ''
    }

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.options = this.options.bind(this)
  }

  handleQueryChange (query) {
    this.setState({
      ...this.state,
      query: query
    })

    if (this.props.onChange && query && query.value) {
      this.props.onChange(query.value)
    } else {
      this.props.onChange(null)
    }
  }

  options () {
    return Users.find({ groupId: { $ne: null }, employee: true }, {
      sort: { lastName: 1 }
    }).fetch().map((user) => {
      return {
        value: user._id,
        label: Users.methods.fullNameWithTitle(user)
      }
    })
  }

  render () {
    return (
      <Select
        value={this.state.query}
        onChange={this.handleQueryChange}
        options={this.options()}
        ignoreCase
        autoFocus={this.props.autoFocus || false}
        placeholder={TAPi18n.__('users.selectEmployee')} />
    )
  }
}
