hexo.extend.helper.register('getArchiveLength', function () {
  const { archive_generator: archiveGenerator } = hexo.config
  if (archiveGenerator && archiveGenerator.enable === false) return this.site.posts.length
  const { yearly, monthly, daily } = archiveGenerator
  const { year, month, day } = this.page
  if (yearly === false || !year) return this.site.posts.length

  const posts = this.site.posts.sort('date')

  const compareFunc = (type, y1, m1, d1, y2, m2, d2) => {
    switch (type) {
      case 'year':
        return y1 === y2
      case 'month':
        return y1 === y2 && m1 === m2
      case 'day':
        return y1 === y2 && m1 === m2 && d1 === d2
      default:
        return false
    }
  }

  const generateDateObj = (type) => {
    return posts.reduce((dateObj, post) => {
      const date = post.date.clone()
      const year = date.year()
      const month = date.month() + 1
      const day = date.date()
      const lastData = dateObj[dateObj.length - 1]

      if (!lastData || !compareFunc(type, lastData.year, lastData.month, lastData.day, year, month, day)) {
        const name = type === 'year' ? year : type === 'month' ? `${year}-${month}` : `${year}-${month}-${day}`
        dateObj.push({
          name,
          year,
          month,
          day,
          count: 1
        })
      } else {
        lastData.count++
      }

      return dateObj
    }, [])
  }

  const data = this.fragment_cache('createArchiveObj', () => {
    const dateObjs = []
    if (yearly) dateObjs.push(...generateDateObj('year'))
    if (monthly) dateObjs.push(...generateDateObj('month'))
    if (daily) dateObjs.push(...generateDateObj('day'))
    return dateObjs
  })

  const name = month ? (day ? `${year}-${month}-${day}` : `${year}-${month}`) : year
  return data.find(item => item.name === name).count
})
