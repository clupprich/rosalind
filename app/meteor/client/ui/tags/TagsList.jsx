import React from 'react'
import { Tags } from 'api/tags'
import css from './style'

export const TagsList = ({ tags = [], onClick, style = {} }) => (
  <span>
    {tags.map((slug) => {
      const tag = slug.tag ? slug : Tags.findOne({ tag: slug })
      return (
        <span
          key={tag._id}
          onClick={() => onClick && onClick(tag._id)}
          style={{ ...style, backgroundColor: tag.color || '#ccc' }}
          className={css.tag}>{tag.tag}
        </span>
      )
    })}
  </span>
)
