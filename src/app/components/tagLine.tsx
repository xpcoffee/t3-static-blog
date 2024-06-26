import React from "react"

const ThisIsMySite = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center`}>
      <div
        tabIndex={-1}
        className="text-sm text-gray-600 dark:text-gray-300 quicksand "
      >
        This is my site. Please treat it gently. ❤
      </div>
    </div>
  )
}

export { ThisIsMySite }
