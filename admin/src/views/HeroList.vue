<template>
  <div>
    <h1>英雄列表</h1>
     <el-table :data="items">
         <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <el-table-column prop="name" label="英雄名称" ></el-table-column>
        <el-table-column prop="title" label="称号 " ></el-table-column>
        <el-table-column prop="avatar" label="头像" >
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="height:3rem;">
          </template>
        </el-table-column>
         
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" 
            @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" 
            @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes" 
        :page-size="pageSize"         
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalData.length">   
      </el-pagination>
      
  </div>
</template>

<script>
export default {
    data(){
        return {
            items:[],
            currentPage:1,
            totalCount:1,
            pageSizes:[5, 10, 20, 40],
            pageSize:10,
            totalData:[],
        }
    },
    methods:{
        async fetch(n1,n2){
            const res = await this.$http.get('rest/heroes');
            this.totalData = res.data;
  
            this.items = this.totalData.slice(n1*n2-n2,n1*n2);
            console.log(this.totalData.slice(0,9));

        },
        async remove(row){
          this.$confirm(`是否确定删除英雄"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/heroes/${row._id}`)
          console.log(res);
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch(this.currentPage,this.pageSize)
        });


        },
         handleSizeChange(val) {
           // 改变每页显示的条数 
           this.pageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
           this.fetch(this.currentPage,this.pageSize)
           
           
       },
         // 显示第几页
       handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
           this.fetch(this.currentPage,this.pageSize)
       },
    },
    created(){
        this.fetch(this.currentPage,this.pageSize)
    }
}
</script>