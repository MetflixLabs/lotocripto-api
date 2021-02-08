interface IPageAndLimit {
  page: number
  limit: number
}

export const pageAndLimitHandler = (page = 1, limit = 10): IPageAndLimit => {
  return {
    page,
    limit
  }
}
