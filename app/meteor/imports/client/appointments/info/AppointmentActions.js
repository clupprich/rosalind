import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import MuiButton from '@material-ui/core/Button'
import { __ } from '../../../i18n'
import { Icon } from '../../components/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const buttons = {
  setAdmitted: { icon: 'angle-right', primary: true },
  startTreatment: { icon: 'circle-o-notch', primary: true },
  endTreatment: { icon: 'check', primary: true },
  setNoShow: { icon: 'times' },
  setCanceled: { icon: 'minus' },
  viewInCalendar: { icon: 'calendar' },
  softRemove: { icon: 'trash-o' },
  move: { icon: 'arrows' }
}

// Usage: <Btn.admit {...props} />
const Btn = Object.keys(buttons).reduce((acc, k) => ({
  ...acc,
  [k]: props =>
    <Button
      {...props}
      {...buttons[k]}
      name={k}
      onClick={() => props.handleClick(k)}
    />
}), {})

const states = [
  {
    when: a => !a.admitted,
    primaryActions: ['setAdmitted', 'setNoShow', 'setCanceled'],
    secondaryActions: null
  },
  {
    when: a => a.admitted && !a.treatmentStart,
    primaryActions: ['startTreatment'],
    secondaryActions: ['unsetAdmitted', 'setNoShow', 'setCanceled']
  },
  {
    when: a => a.treatmentStart && !a.treatmentEnd,
    primaryActions: ['endTreatment'],
    secondaryActions: ['unsetAdmitted', 'unsetStartTreatment', 'setNoShow', 'setCanceled']
  },
  {
    when: a => a.treated,
    primaryActions: null,
    secondaryActions: ['unsetAdmitted', 'unsetStartTreatment', 'unsetEndTreatment', 'setNoShow', 'setCanceled']
  }
]

const nextAction = appointment =>
  states.find(s => s.when(appointment))

const Button = ({ icon, name, primary, ...props }) => {
  const onClick = props[name]
  if (!onClick) { console.error('Button', name, 'has no click handler') }

  return <MuiButton
    variant={primary ? 'contained' : null}
    style={primary ? primaryButtonStyle : buttonStyle}
    onClick={onClick}
  >
    <Icon name={icon} />
    &emsp;
    {__('appointments.' + name)}
  </MuiButton>
}

const buttonStyle = {
  opacity: 0.75,
  marginRight: 20
}

const primaryButtonStyle = {
  ...buttonStyle,
  opacity: 0.9,
  backgroundColor: '#fff'
}

const menuButtonStyle = {
  ...buttonStyle,
  opacity: 0.3,
  marginRight: 20,
  height: 37,
  width: 40,
  minWidth: 55
}

export const AppointmentActions = compose(
  withState('anchor', 'setAnchor', null),
  withHandlers({
    handleMenuOpen: props => e => props.setAnchor(e.currentTarget),
    handleMenuClose: props => e => props.setAnchor(null),
    handleClick: props => actionName => {
      console.log(actionName)
      props.setAnchor(null)
    }
  })
)((props) => {
  const {
    appointment,
    anchor,
    handleMenuOpen,
    handleMenuClose,
    viewInCalendar,
    move
  } = props

  const next = nextAction(appointment)

  const primaryActions = next.primaryActions && next.primaryActions.map(n => Btn[n])
  const secondaryActions = next.secondaryActions

  return <div style={containerStyle}>
    <div style={leftStyle}>
      {
        primaryActions && primaryActions.map((NextAction, i) =>
          <NextAction
            key={i}
            {...props}
          />
        )
      }

      {viewInCalendar && <Btn.viewInCalendar {...props} />}

      {
        secondaryActions &&
        <MuiButton
          variant='outlined'
          style={menuButtonStyle}
          onClick={handleMenuOpen}
        >
          <Icon name='ellipsis-h' />
        </MuiButton>
      }

      {
        secondaryActions && <Menu
          open={!!anchor}
          anchorEl={anchor}
          getContentAnchorEl={null}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          {
            secondaryActions.map(a =>
              <MenuItem
                key={a}
                onClick={() => {
                  handleMenuClose()
                  props[a]()
                }}
              >
                <span style={menuIconStyle}>
                  {buttons[a] ? <Icon name={buttons[a].icon} /> : null}
                </span>
                {__('appointments.' + a)}
              </MenuItem>
            )
          }
        </Menu>
      }
    </div>

    <div style={rightStyle}>
      <Btn.softRemove {...props} />
      {move && <Btn.move {...props} />}
    </div>
  </div>
})

const menuIconStyle = {
  display: 'inline-block',
  width: 30
}

const containerStyle = {
  width: '100%',
  display: 'flex'
}

const leftStyle = {
  flexGrow: 1
}

const rightStyle = {
  flexShrink: 1,
  textAlign: 'right'
}
