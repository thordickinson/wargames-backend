
export function wrapResolver(resolverFn: (...args: any[]) => any) {
    return (...args: any[]) => {
        try {
            return resolverFn(...args);
        } catch (error) {
            //convert error as string
            console.error(error);
            throw new Error(`error: ${error}`);
        }
    }
}

