<template>
	<div>
		<nav class="pagination is-small" role="navigation" aria-label="pagination" :v-show="totalPages > 1">
			<a
				:class="{'disable' : !allowedPage(page - 1)}"
				class="pagination-previous"
				:aria-label="`Goto page ${page - 1}`"
				href="javascript:void(0);"
				@click="prev()">
				Previous
			</a>
			<a
				:class="{'disable' : !allowedPage(page + 1)}"
				class="pagination-next"
				:aria-label="`Goto page ${page + 1}`"
				href="javascript:void(0);"
				@click="next()">
				Next page
			</a>
			<ul class="pagination-list">
				<li>
					<a
						:aria-label="`Goto page ${firstPage}`"
						class="pagination-link"
						href="javascript:void(0);"
						@click="setPage(firstPage)"
					>
						{{ firstPage }}
					</a>
				</li>
				<li><span class="pagination-ellipsis">&hellip;</span></li>
				<template v-for="(item, key) in pages">
					<li
						:key="key"
					>
						<a
							:class="{ 'is-current': parseInt(page) === parseInt(item) }"
							:aria-label="`Page ${page}`"
							href="javascript:void(0);"
							class="pagination-link"
							role="button"
							@click="setPage(item)">{{ item }}</a>
					</li>
				</template>
				<li><span class="pagination-ellipsis">&hellip;</span></li>
				<li>
					<a
					   :aria-label="`Goto page ${lastPage}`"
					   class="pagination-link"
					   href="javascript:void(0);"
					   @click="setPage(lastPage)"
					>
						{{ lastPage }}
					</a>
				</li>
			</ul>
		</nav>
<!--		<div class="VuePagination">-->
<!--			<ul-->
<!--				v-show="totalPages > 1"-->
<!--				class="pagination">-->
<!--				<li-->
<!--					:class="{disabled : !allowedPage(page - 1)}"-->
<!--					class="page-item">-->
<!--					<a-->
<!--						class="page-link page-prev"-->
<!--						href="javascript:void(0);"-->
<!--						>{{ $t('pagination.btn_previous') }}</a>-->
<!--				</li>-->

<!--				<template v-for="(item, key) in pages">-->
<!--					<li-->
<!--						:class="{active: parseInt(page) === parseInt(item)}"-->
<!--						class="page-item "-->
<!--						:key="key"-->
<!--					>-->
<!--						<a-->
<!--							class="page-link"-->
<!--							role="button"-->
<!--							@click="setPage(item)">{{ item }}</a>-->
<!--					</li>-->
<!--				</template>-->
<!--			</ul>-->
<!--		</div>-->
	</div>
</template>

<script>
	export default {
		props: {
			pageParent: {
				type: Number,
				default: 1,
			},
			records: {
				type: Number,
				required: true,
			},
			chunk: {
				type: Number,
				required: false,
				default: 6,
			},
			perPage: {
				type: Number,
				required: true,
			},
			firstPage: {
				type: Number,
				required: true,
			},
			lastPage: {
				type: Number,
				required: true,
			}
		},
		data () {
			return {
				page: this.pageParent,
				isPage: 0,
			};
		},
		computed: {
			pages () {
				if (!this.records) {
					return [];
				}

				return range(Math.max((this.page - 1) % (this.chunk - 1) === 0 ? this.page : (this.page - (this.page - 1) % (this.chunk - 1)), 1), this.chunk, this.totalPages);
			},
			totalPages () {
				return this.records ? Math.ceil(this.records / this.perPage) : 1;
			},
			totalChunks () {
				return Math.ceil(this.totalPages / this.chunk);
			},
			currentChunk () {
				return Math.ceil(this.page / this.chunk);
			},
			paginationStart () {
				const rawValue = ((this.currentChunk - 1) * this.chunk) + 1;
				if (this.page === (rawValue + this.chunk - 1)) {
					return rawValue + 1;
				}
				return rawValue;
			},
			pagesInCurrentChunk () {
				return this.paginationStart + this.chunk <= this.totalPages ? this.chunk : this.totalPages - this.paginationStart + 1;
			},
		},
		watch: {
			records () {
				if (this.page > this.totalPages) {
					this.page = 1;
				}
			},
			pageParent () {
				this.page = this.pageParent;
			},
		},
		methods: {
			setPage (page) {
				if (this.allowedPage(page) && this.isPage !== page) {
					this.paginate(page);
					this.isPage = page;
				}
			},
			paginate (page) {
				this.page = page;
				this.$emit('Pagination:page', page);
			},
			next () {
				return this.setPage(this.page + 1);
			},
			prev () {
				return this.setPage(this.page - 1);
			},
			setChunk (direction) {
				this.setPage((((this.currentChunk - 1) + direction) * this.chunk) + 1);
			},
			allowedPage (page) {
				return page >= 1 && page <= this.totalPages;
			},
			allowedChunk (direction) {
				return (parseInt(direction) === 1 && this.currentChunk < this.totalChunks) ||
					(parseInt(direction) === -1 && this.currentChunk > 1);
			},
			allowedPageClass (direction) {
				return this.allowedPage(direction) ? '' : 'disabled';
			},
			allowedChunkClass (direction) {
				return this.allowedChunk(direction) ? '' : 'disabled';
			},
			activeClass (page) {
				return parseInt(this.page) === parseInt(page) ? 'active' : '';
			},
		},
	};

	function range (start, chunk, total) {
		if (start + chunk > total) {
			start = Math.max(total - chunk + 1, 1);
		}
		const end = chunk > total ? total : chunk;
		return Array.apply(0, Array(end))
			.map((element, index) => index + start);
	}
</script>
