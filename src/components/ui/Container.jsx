export default function Container({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`shell ${className}`}>{children}</Tag>
}
