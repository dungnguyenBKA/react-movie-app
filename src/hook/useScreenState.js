import {useEffect, useState} from "react";

function useScreenState() {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    return () => {
      setMounted(false)
    }
  }, [])

  return {
    mounted,
    loading,
    setLoading,
  }
}

export default useScreenState
