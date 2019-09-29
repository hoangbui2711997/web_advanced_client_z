<template>
	<div :style="{width: widthTable}" :class="{'no-data': emptyData}" class="tableContainer">
		<table>
			<thead>
			<tr ref="header" @click="onSort">
				<slot/>
			</tr>
			</thead>
			<tbody>
			<template v-show="!(fetching)">
				<slot name="first_row"/>
				<slot v-for="(row, index) in rows" :index="index" :item="row" name="body"/>
				<template v-if="emptyData">
					<div class="no-data-icon-wrapper">
						<div class="no-data-icon">
                <span class="iconmo-nodata"><span class="path1"/><span class="path2"/><span
	                class="path3"/><span class="path4"/><span class="path5"/><span class="path6"/><span
	                class="path7"/><span class="path8"/><span class="path9"/><span class="path10"/><span
	                class="path11"/><span class="path12"/><span class="path13"/><span
	                class="path14"/><span class="path15"/><span class="path16"/></span>
							<span class="no-data-text">{{ msgEmptyData || $t('common.datatable.empty_data') }}</span>
						</div>
					</div>
				</template>
				<template v-else-if="rows.length > 0">
					<tr v-for="(row, index) in emptyRow" :key="`empty_row_${index}`">
						<td v-for="index in column" :key="index">
							&nbsp;
						</td>
					</tr>
				</template>
				<slot name="end_row"/>
			</template>
			</tbody>
		</table>
		<template>
			<div class="wrap-footer mt-20">
<!--				<div v-if="displayMessage && !emptyData" :class="{'message-white-bottom': displayMessage && totalRecord <= 10}" class="table-footer">-->
<!--					<div class="display-result">{{ getMessagePage }}</div>-->
<!--				</div>-->
				<pagination
					ref="pagination"
					:chunk="chunk"
					:page-parent="page"
					:per-page="perPage"
					:records="totalRecord"
					:first-page="1"
					:last-page="lastPage"
					class="text-center"
					@Pagination:page="onPageChange"/>
			</div>
		</template>
	</div>
</template>

<script>
	import _ from 'lodash';
	import Pagination from './Pagination.vue';

	export default {
		name: 'DataTable',

		components: {
			Pagination,
		},
		props: {
			getData: {
				type: Function,
			},
			limit: {
				type: Number,
				default: 10,
			},
			chunk: {
				type: Number,
				default: 6,
			},
			widthTable: {
				type: String,
				default: '100%',
			},
			msgEmptyData: {
				type: String,
			},
			showEmptyRow: {
				type: Boolean,
				default: false,
			},
			// displayMessage: {
			// 	type: Boolean,
			// 	default: true,
			// },
		},
		data () {
			return {
				isChanged: false,
				maxPageWidth: 10,
				totalRecord: 0,
				lastPage: 0,
				page: 1,
				perPage: 10,
				column: 0,
				fetching: false,
				rows: [],
				params: {},
				orderBy: null,
				sortedBy: null,
				emptyData: false,
			};
		},
		computed: {
			emptyRow () {
				if (!this.showEmptyRow) {
					return 0;
				}
				const emptyRowCount = Math.max(this.limit - _.size(this.rows), 0);
				return Math.min(emptyRowCount, this.limit);
			},
			// getMessagePage () {
			// 	let from = ((this.page - 1) * this.perPage) + 1;
			// 	let to = (this.page * this.perPage);
			// 	to = Math.min(to, this.totalRecord);
			// 	from = Math.min(from, this.totalRecord);
			// 	console.log(this.$i18n.locale, "this.$i18n.locale");
			// 	window.test = this.$i18n;
			// 	return `${from}${this.$t('paginate.to')}${to}${this.$t('paginate.of')}${this.totalRecord}${this.$t('paginate.end')}`;
			// },
		},
		created () {
			this.fetch();
			this.$on('DataTable:filter', (params) => {
				this.filter(params);
			});
		},
		mounted () {
			this.column = _.chain(this.$slots.default).filter((el) => el.tag === 'th').value().length;
		},
		methods: {
			renderDataFromServer (res) {
				const data = res.data;
				if (!res.data) {
					this.rows = res;
					this.emptyData = _.isEmpty(this.rows);
					this.$emit('DataTable:finish');
					return;
				}
				this.column = _.chain(this.$slots.default).filter((el) => el.tag === 'th').value().length;
				if (!data.data) {
					this.rows = data;
					this.emptyData = _.isEmpty(this.rows);

					this.$emit('DataTable:finish');
					return;
				}
				this.page = parseInt(data.current_page);
				this.totalRecord = parseInt(data.total);
				this.lastPage = parseInt(data.last_page);
				this.perPage = parseInt(data.per_page);
				this.rows = data.data;

				this.emptyData = _.isEmpty(this.rows);
				this.$emit('DataTable:finish');
			},
			onPageChange (page) {
				this.page = page;
				this.fetch();
			},

			getTarget (target) {
				let node = target;
				while (node.parentNode && node.parentNode.nodeName !== 'TR') {
					node = node.parentNode;
				}
				return node;
			},

			getSortOrder (target) {
				let sortOrder = target.dataset.sortOrder;
				switch (sortOrder) {
					case 'asc':
						sortOrder = 'desc';
						break;
					case 'desc':
						sortOrder = '';
						break;
					default:
						sortOrder = 'asc';
				}
				return sortOrder;
			},

			setSortOrders (target, sortOrder) {
				let iterator = target.parentNode.firstChild;
				while (iterator) {
					iterator.dataset.sortOrder = '';
					iterator = iterator.nextElementSibling;
				}
				target.dataset.sortOrder = sortOrder;
			},

			onSort (event) {
				const target = this.getTarget(event.target);

				const orderBy = _.get(target.dataset, 'sortField')
				if (!orderBy) {
					return;
				}
				this.sortedBy = this.getSortOrder(target);
				this.orderBy = this.sortedBy ? orderBy : '';
				Object.assign(this.params, { sort: this.orderBy, sort_type: this.sortedBy });
				this.setSortOrders(target, this.sortedBy);
				this.fetch();
			},

			fetch () {
				const meta = {
					page: this.page,
					limit: this.limit,
				};

				this.fetching = true;
				this.getData(Object.assign(meta, this.params)).then((res) => {
					const data = res.data;
					if (!res.data) {
						this.rows = res;
						this.emptyData = window._.isEmpty(this.rows);
						this.$emit('DataTable:finish');
						return;
					}
					this.column = _.chain(this.$slots.default).filter((el) => el.tag === 'th').value().length;
					if (!data.data) {
						this.rows = data;
						this.emptyData = window._.isEmpty(this.rows);

						this.$emit('DataTable:finish');
						return;
					}
					this.page = parseInt(data.current_page);
					this.totalRecord = parseInt(data.total);
					this.lastPage = parseInt(data.last_page);
					this.perPage = parseInt(data.per_page);
					this.rows = data.data;

					this.emptyData = window._.isEmpty(this.rows);
					this.isChanged = true;
					this.$emit('DataTable:finish');
				}).then(() => {
					this.fetching = false;
				});
			},
			fetchData (numberItems = 0) {
				if (numberItems !== 0) {
					const total = Math.min(this.totalRecord, this.page * this.limit);
					this.page = Math.ceil((total - numberItems) / this.limit);
				}
				this.fetch();
			},
			refresh () {
				this.page = 1;
				this.params = {};
				this.fetch();
			},
			refreshOrder () {
				this.orderBy = null;
				this.sortedBy = null;

				let iterator = this.$refs.header.firstChild;
				while (iterator) {
					iterator.dataset.sortOrder = '';
					iterator = iterator.nextElementSibling;
				}
			},
			filter (params) {
				this.page = 1;
				this.params = params;
				this.fetch();
			},
			filterWithoutResetPage (params) {
				this.params = params;
				this.fetch();
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/variables";

	.wrap-footer {
		height: 20px;
	}

	/*.message-white-bottom {*/
	/*	background-color: white;*/
	/*}*/

	.tableContainer {
		position: relative;
		min-height: 256px;

		&.no-data {
			border: solid thin #cfcfcf;
			table {
				border: none;
			}
		}
	}

	th[data-sort-field] {
		cursor: pointer;
	}

	th[data-sort-order='desc'],
	th[data-sort-order='asc'] {
		color: #1ea1f2 !important;
	}

	th[data-sort-field]::after {
		font-family: 'icomoon' !important;
		margin-left: 5px;
		vertical-align: middle;
		font-size: 9px;
		position: absolute;
	}

	th[data-sort-order='desc']::after {
		content: "\E901";
		margin-left: 5px;
		font-size: 1em;
		color: #1ea1f2;
		position: absolute;
	}

	th[data-sort-order='asc']::after {
		content: "\E902";
		margin-left: 5px;
		font-size: 1em;
		color: #1ea1f2;
	}

	table {
		width: 100%;
		border: solid thin #cfcfcf;
		thead {
			background-color: #fff;

			tr {
				border-bottom: solid thin #ccc;

				th.date {
					color: $color-primary-blue;
					cursor: pointer;
					height: 30px;

					i {
						color: $color-primary-blue;
					}
				}

				th {
					font-weight: normal;
					color: #666666;
					padding: 6px 15px;
					position: relative;
					font-size: $font_small;
				}

				.select-cancel {
					cursor: pointer;
					float: right;
					display: flex;
					align-items: center;

					.btn-cancel-all {
						float: left;
						font-size: 12px;
						background: none;
						padding: 3px 8px;
						color: #666666;
						outline: none;
						border: solid thin #c0c0c0;
					}

					.dropdown-select {
						border: solid thin #c0c0c0;
						padding: 3px;
						display: flex;
						justify-content: center;
						align-items: center;
						height: 25px;
						width: 25px;
						margin-left: 5px;

						&:hover {
							i {
								transform: rotate(-180deg);
							}

							.cancel-action {
								visibility: visible;
							}
						}

						i {
							font-size: 10px;
							color: #999999;
							transition: all 0.3s ease-in-out;
						}

						.cancel-action {
							position: absolute;
							background-color: #fff;
							-webkit-box-shadow: 0px 2px 14px 0px rgba(50, 50, 50, 0.25);
							-moz-box-shadow: 0px 2px 14px 0px rgba(50, 50, 50, 0.25);
							box-shadow: 0px 2px 14px 0px rgba(50, 50, 50, 0.25);
							right: 13px;
							top: 28px;
							width: 165px;
							visibility: hidden;

							li {
								padding: 7px 14px;
								text-align: right;
							}
						}
					}
				}
			}
		}

		tbody {
			tr {
				td {
					padding: 10px 15px;
					line-height: 36px;
				}

				td.red {
					color: #ee4a4a;
				}

				td.green {
					color: $color-primary-green;
				}

				.btn-cancel {
					color: $color-primary-blue;
					font-size: $font_small;
					cursor: pointer;

					i {
						color: $color-primary-blue;
						font-size: 9px;
					}
				}
			}

			tr:nth-child(odd) {
				background-color: #f6f6f6;
			}

			tr.disabled {
				opacity: 0.3;
			}
		}
	}

	.no-data-icon-wrapper {
		display: table-row;
		position: relative;
		// height: 200px;

		.no-data-icon {
			position: absolute;
			font-size: 60px;
			left: 50%;
			top: 106px;
			text-align: center;
			min-width: 220px;
			line-height: 1;
			transform: translateX(-50%);
		}

		.no-data-text {
			font-size: 13px;
			vertical-align: middle;
			color: #666;
		}

		.iconmo-nodata {
			vertical-align: middle;
			opacity: 0.5;
		}
	}

</style>
