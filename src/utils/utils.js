export const removeAfterSomeTime = (errors,func) => {
    if (Object.keys(errors).length > 0) {
        const timer = setTimeout(() => {
            func({})
        }, 5000)
        return () => clearTimeout(timer)
    }
}