import React, { useState, useEffect, useCallback } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { Input, Message, Tag } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import tagCss from './index.module.css';
import { apiGetTags, apiAddTag, apiDeleteTag } from '@/api/tags';

interface Tag {
  _id: string;
  tagName: string;
  color: string;
}
export default function TagCloud(props) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<Array<Tag> | undefined>();
  const { max, form } = props;
  const fetchTags = useCallback(async () => {
    try {
      const data = await apiGetTags();
      setTags(data.list);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    fetchTags();
  });
  useEffect(() => {
    form.setFieldValue('tags', tags);
  }, [tags]);
  const addTag = async () => {
    try {
      if (!inputValue.trim()) {
        Message.warning(`标签内容不能为空`);
        return setShowInput(false);
      }
      if (tags.length >= max) {
        return Message.warning(`标签不能超过${max}个`);
      }
      if (!tags.find((item) => item.tagName == inputValue)) {
        const { data: tag } = await apiAddTag(inputValue);
        tags.push(tag);
        setTags([...tags]);
      } else {
        Message.warning('该标签已存在！');
      }
      setShowInput(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const closeTag = async (id) => {
    try {
      await apiDeleteTag(id);
      const idx = tags.findIndex((item) => item._id == id);
      tags.splice(idx, 1);
      setTags([...tags]);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <TweenOneGroup
      enter={{
        scale: 0.8,
        opacity: 0,
        type: 'from',
        duration: 200,
      }}
      leave={{
        opacity: 0,
        width: 0,
        scale: 0,
        duration: 200,
      }}
      className={tagCss['tag-cloud']}
    >
      {tags &&
        tags.map((tag) => (
          <Tag
            size="large"
            key={tag._id}
            color={tag.color}
            closable
            onClose={() => {
              closeTag(tag._id);
            }}
          >
            {tag.tagName}
          </Tag>
        ))}
      {showInput ? (
        <Input
          autoFocus
          size="mini"
          value={inputValue}
          style={{ width: 84 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          size="large"
          style={{
            width: 84,
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          className="add-tag"
          tabIndex={0}
          onClick={() => setShowInput(true)}
          onKeyDown={(e) => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
              // enter
              setShowInput(true);
            }
          }}
        >
          添加标签
        </Tag>
      )}
    </TweenOneGroup>
  );
}
