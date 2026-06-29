export interface RequestContext {
    id: string;
    timestamp: Date
    capability: string;
    version?: string;
}

export interface AuthContext {
    user?: unknown;
    organization?: unknown;
    permissions: string[];
}

export interface Logger {
    info(message: string, meta?: unknown): void;
    warn(message: string, meta?: unknown): void;
    error(message: string, meta?: unknown): void;
    debug(message: string, meta?: unknown): void;
}

export interface Enviroment {
    get(key: string): string | undefined;
}

export interface Secrets {
    get(name: string): Promise<string>;
}

export interface Storage {
    get<T>(key: string): Promise<T | null>;
    put<T>(key: string, value: T): Promise<void>;
    delete(key: string): Promise<void>;
}

export interface HttpClient {
    get<T>(url: string, options?: RequestInit): Promise<T>;

    post<T>(
        url: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<T>;

    put<T>(
        url: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<T>;

    delete<T>(
        url: string,
        options?: RequestInit
    ): Promise<T>;
}

export interface PlatformContext {
    emit(event: string, payload?: unknown): Promise<void>;

    metric(
        name: string,
        value: number
    ): Promise<void>;
}

export interface ServiceRegistry {
    invoke<T>(
        capability: string,
        input: unknown
    ): Promise<T>;
}

export interface CapabilityContext<TInput = unknown>{
    input: TInput;

    request: RequestContext;

    auth: AuthContext;

    logger: Logger;

    env: Enviroment;

    secrets: Secrets;

    storage: Storage;

    http: HttpClient;

    services: ServiceRegistry;

    platform: PlatformContext;
}