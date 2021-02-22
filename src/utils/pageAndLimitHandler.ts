interface IPageAndLimit {
  page: number
  limit: number
}

export const pageAndLimitHandler = (
  pageReq: string | number | undefined = 1,
  limitReq: string | number | undefined = 10
): IPageAndLimit => {
  const state = {
    page: 1,
    limit: 10
  }

  if (typeof pageReq === 'string') state.page = parseInt(pageReq)
  if (typeof limitReq === 'string') state.limit = parseInt(limitReq)

  if (typeof pageReq === 'number') state.page = pageReq
  if (typeof limitReq === 'number') state.limit = limitReq

  return {
    page: state.page,
    limit: state.limit
  }
}
