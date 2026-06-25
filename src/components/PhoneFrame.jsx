export default function PhoneFrame({ children }) {
  return (
    <div className="phone-scene">
      <div className="phone-btn-silent" />
      <div className="phone-btn-vol-up" />
      <div className="phone-btn-vol-down" />
      <div className="phone-btn-power" />

      <div className="phone-body">
        <div className="phone-dynamic-island" />
        <div className="phone-screen">
          <div className="phone-screen-scroll">
            {children}
          </div>
        </div>
        <div className="phone-home-bar" />
      </div>
    </div>
  )
}
