export class PaginationHelper {
  static toResponse({ items, meta }) {
    return {
      data: items,
      meta,
    }
  }

  static toMetaResponse({ pageOptions, itemCount}) {
    return {
      page: pageOptions.page,
      take: pageOptions.take,
      pageCount: Math.ceil(itemCount / pageOptions.take),
      itemCount: itemCount,
      hasNextPage: pageOptions.page < Math.ceil(itemCount / pageOptions.take),
      hasPreviousPage: pageOptions.page > 1
    }
  }
}
