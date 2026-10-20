export default function Container({ as: Tag = 'div', wide = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={`mx-auto w-full ${wide ? 'max-w-shell' : 'max-w-[1240px]'} px-5 sm:px-8 lg:px-12 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
