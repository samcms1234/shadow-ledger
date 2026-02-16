interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className = "", ...props }: Props) => (
  <button
    {...props}
    className={`bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition ${className}`}
  >
    {children}
  </button>
)
