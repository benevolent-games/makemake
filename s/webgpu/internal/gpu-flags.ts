
export namespace GPUBufferUsage {
	export const MAP_READ      = 0x0001
	export const MAP_WRITE     = 0x0002
	export const COPY_SRC      = 0x0004
	export const COPY_DST      = 0x0008
	export const INDEX         = 0x0010
	export const VERTEX        = 0x0020
	export const UNIFORM       = 0x0040
	export const STORAGE       = 0x0080
	export const INDIRECT      = 0x0100
	export const QUERY_RESOLVE = 0x0200
}

export namespace GPUShaderStage {
	export const VERTEX   = 0x1
	export const FRAGMENT = 0x2
	export const COMPUTE  = 0x4
}

export namespace GPUMapMode {
	export const READ  = 0x0001
	export const WRITE = 0x0002
}
