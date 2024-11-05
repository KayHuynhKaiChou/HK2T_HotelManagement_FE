interface PrivateRouteProps {
    children : React.ReactNode
}

export default function PrivateRoute({children} : PrivateRouteProps) {
  return (
    <div>
      {children}
    </div>
  )
}

