import MyButton from '@/components/ui/Button'
export default {
  title: 'Button',
  component: MyButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'outline-primary',
          'outline-secondary',
          'outline-white',
        ],
      },
      defaultValue: 'primary',
    },
    rounded: { control: 'boolean' },
    text: {
      control: 'text',
      defaultValue: 'Awesome Button',
    },
  },
}

export const Button = (arg, { argTypes }) => ({
  components: { MyButton },
  props: Object.keys(argTypes),
  template: '<MyButton v-bind="$props" />',
})
