import { defineType, defineField } from 'sanity'

export const excuse = defineType({
  name: 'excuse',
  title: 'Excuse',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: '핑계 문장',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'target',
      title: '누구에게',
      type: 'string',
      options: {
        list: ['직장 상사', '동료', '친구', '교수님', '연인', '나에게'],
      },
    }),
    defineField({
      name: 'situation',
      title: '상황',
      type: 'string',
      options: {
        list: ['지각', '목표 달성 실패', '실수', '약속 취소', '아무것도 안 함'],
      },
    }),
    defineField({
      name: 'tone',
      title: '농담 농도',
      type: 'string',
      options: {
        list: ['serious', 'funny', 'nonsense'],
      },
    }),
    defineField({
      name: 'likes',
      title: '좋아요 수',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: '활성화 여부',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
