export function PageDTO(entity: any) {
    if (entity instanceof Array) {
        return {
            data: {
                items: entity,
            }
        }
    } else {
        return {
            data: entity,
        }
    }
}