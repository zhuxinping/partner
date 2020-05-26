<template>
    <div>
		<div class="grid-container">
			<table class="spr-grid">
				<thead>
					<th class="line"></th>
					<th class="active">订单数量(笔)</th>
					<th class="active">订单金额(元)</th>
					<th>毛利(元)</th>
				</thead>
				<tr>
					<td class="cur">买券订单</td>
					<td class="active">{{tableData.purchaseOrderTotal | numThousand}}</td>
					<td>{{tableData.purchaseOrderAmonut | numFilter | numThousand}}</td>
					<td>{{tableData.purchaseOrderGrossProfit |numFilter | numThousand}}</td>
				</tr>
				<tr>
					<td class="cur">充值订单</td>
					<td class="active">{{tableData.rechargeOrderTotal | numThousand}}</td>
					<td>{{tableData.rechargeOrderAmonut| numFilter | numThousand}}</td>
					<td>{{tableData.rechargeOrderGrossProfit| numFilter}}</td>
				</tr>
				<tr>
					<td class="cur">退款订单</td>
					<td class="active">{{tableData.refundOrderTotal | numThousand}}</td>
					<td>{{tableData.refundOrderAmonut| numFilter | numThousand}}</td>
					<td>{{tableData.refundOrderGrossProfit| numFilter | numThousand}}</td>
				</tr>
				<tr>
					<td class="cur">未支付</td>
					<td class="active">{{tableData.unpaidOrderTotal | numThousand}}</td>
					<td>{{tableData.unpaidOrderAmonut|numFilter | numThousand}}</td>
					<td>--</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrderSum',
	props: {
		allOrderData: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	data () {
		return {
			tableData: {}
		}
	},
	watch: {
		allOrderData (newV, oldV) {
			this.tableData = newV
		}
	}
}
</script>

<style lang="stylus" scoped >
	.grid-container
		background #fff
		border-collapse collapse
		padding 15px 35px 65px 35px
		.spr-grid
			margin 0 auto
			thead th
				width 150px
				height 80px
				line-height 80px
				border 2.1px solid #eee
				text-align right
				padding-right 16px
				font-size 28px
				font-weight normal
				color #818D9D
			thead th.active
				width 220px
			thead th.line
				position relative
			thead th.line:after
				content ""
				position absolute
				width 100%
				height 80px
				background url("../../../assets/images/icon_line.png") no-repeat
				background-size 100% 100%
				left 0
				top 0
			tr td
				width 150px
				height 80px
				line-height 80px
				border 2.1px solid #eee
				text-align right
				font-size 26px
				color #05ACFF
				padding-right 16px
			tr td.cur
				color #818D9D
				text-align center
				padding 0 20px
			tr td.active
				width 200px
</style>
