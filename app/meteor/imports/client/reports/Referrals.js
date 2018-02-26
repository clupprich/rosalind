import React from 'react'
import uniq from 'lodash/uniq'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { Calendars } from '../../api/calendars'
import { Tags } from '../../api/tags'
import { Box } from '../components/Box'
import { Icon } from '../components/Icon'

export const Referrals = ({ referrals, mapUserIdToName }) => {
  const hasData = referrals.total.referred.total || referrals.total.redeemed.total
  if (!hasData) { return null }

  const columns = uniq([
    ...Object.keys(referrals.total.referred.ids),
    ...Object.keys(referrals.total.redeemed.ids)])
    .map(_id => {
      const tag = Tags.findOne({ _id })
      if (tag) {
        return {
          _id,
          title: tag.tag
        }
      }
      const calendar = Calendars.findOne({ _id })
      if (calendar) {
        return {
          _id,
          title: calendar.name
        }
      }

      console.error('Cannot find calendar or tag with id', _id, referrals)
      return {}
    })

  return (
    <div style={avoidPageBreak}>
      <Box title='Empfehlungen' noPadding>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>{/* Name */}</Cell>
              {
                columns.map(c =>
                  <Cell key={c._id} colSpan={2}>
                    {c.title}
                  </Cell>
                )
              }
              <Cell colSpan={2}>Gesamt</Cell>
            </TableRow>
            <TableRow>
              <Cell>{/* Name */}</Cell>
              {
                columns.map(c =>
                  [
                    <Cell key={`${c._id}-referred`}>
                      <Icon name='commenting-o' />
                    </Cell>,
                    <Cell key={`${c._id}-redeemed`}>
                      <Icon name='check' />
                    </Cell>
                  ]
                )
              }
              <Cell>
                <Icon name='commenting-o' />
              </Cell>
              <Cell>
                <Icon name='check' />
              </Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              referrals.assignees.map(a =>
                <TableRow key={a.assigneeId}>
                  <Cell>{mapUserIdToName(a.assigneeId)}</Cell>
                  {
                    columns.map(c =>
                      [
                        <Cell key={`${c._id}-${a.assigneeId}-referred`}>
                          <Value
                            total={a.referred.ids[c._id]}
                            today={a.referredToday.ids[c._id]}
                          />
                        </Cell>,
                        <Cell key={`${c._id}-${a.assigneeId}-redeemed`}>
                          <Value
                            total={a.redeemed.ids[c._id]}
                            today={a.redeemedToday.ids[c._id]}
                          />
                        </Cell>
                      ]
                    )
                  }
                  <Cell>
                    <Value
                      total={a.referred.total}
                      today={a.referredToday.total}
                    />
                  </Cell>
                  <Cell>
                    <Value
                      total={a.redeemed.total}
                      today={a.redeemedToday.total}
                    />
                  </Cell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Box>
    </div>
  )
}

const Cell = ({ children, ...props }) =>
  <TableCell padding='dense' {...props}>
    {children}
  </TableCell>

const Value = ({ total, today }) =>
  <span>
    {total}
    {
      today && today > 0
        ? <span className='text-muted'>
          &nbsp;
          (+{today})
        </span> : null
    }
  </span>

const avoidPageBreak = {
  pageBreakInside: 'avoid'
}