<template>
	<div>
		<tree-navigation :tree-data="navbar"></tree-navigation>
		<el-dropdown size="medium" split-button type="primary">
			Medium
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>Action 1</el-dropdown-item>
				<el-dropdown-item>Action 2</el-dropdown-item>
				<el-dropdown-item>Action 3</el-dropdown-item>
				<el-dropdown-item>Action 4</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div class="columns">
			<div class="column">1</div>
			<div class="column">2</div>
			<div class="column">3</div>
		</div>
		<div class="button">Button</div>
		<div class="button is-primary">Button</div>
		<div class="button is-primary is-large">Button</div>
		<div class="is-outlined is-large is-pulled-right">Button</div>
		<div class="is-outlined is-large is-marginless">Button</div>
		<div class="is-outlined is-large is-marginless is-unselectable">Button</div>
		<div class="card">
			<header class="card-header">
				<!-- header content -->
				Header content
			</header>

			<div class="card-content">
				Card content
				<div class="card-image">
					<!-- card image -->
				</div>
			</div>

			<footer class="card-footer">
				Foot content
				<!-- footer content -->
			</footer>
		</div>
		<div class="column is-5-tablet is-4-desktop is-3-widescreen">
			<form class="box">
				Login
			</form>
		</div>
		<form class="box">
			<div class="field has-text-centered">
				<!--      <img src="images/logo-bis.png" width="167">-->
			</div>
			<div class="control has-icons-left">
				<input class="input" type="email" placeholder="e.g. alex@smith.com" required>
				<span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
			</div>

			<div class="field">
				<label class="label">Password</label>
				<div class="control has-icons-left">
					<input class="input" type="password" placeholder="********" required>
					<span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
				</div>
			</div>

			<div class="field">
				<label class="checkbox">
					<input type="checkbox">
					Remember me
				</label>
			</div>

			<div class="field">
				<button class="button is-success">
					Login
				</button>
			</div>
			<nav class="navbar has-shadow">
				<div class="navbar-brand">
					<!-- Logo, tagline, and navbar-burger -->
					<a class="navbar-item">
						<!--            <img src="images/logo.png">-->
					</a>
					<div class="navbar-burger">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<div class="navbar-menu">
					<!-- User name, dropdown menu -->
					<div class="navbar-end">
						<div class="navbar-item has-dropdown is-hoverable">
							<div class="navbar-link">
								Alex Johnson
							</div>
							<div class="navbar-dropdown">
								<a class="navbar-item">
									<div>
										<span class="icon is-small"><i class="fa fa-user-circle-o"></i></span>Profile
									</div>
								</a>
								<a class="navbar-item">
									<div>
										<span class="icon is-small"><i class="fa fa-bug"></i></span>Report bug
									</div>
								</a>
								<a class="navbar-item">
									<div>
										<span class="icon is-small"><i class="fa fa-sign-out"></i></span>Sign Out
									</div>
								</a></div>
						</div>
					</div>
					<div class="navbar-start">
						<div class="navbar-item">
							<small>Publishing at the speed of technology</small>
						</div>
					</div>
				</div>
			</nav>
		</form>

		<section class="section">
			<!-- The main content of the page -->
			<div class="columns">
				<div class="column is-4-tablet is-3-desktop is-2-widescreen">
					<!-- The sidebar -->
					<nav class="menu">
						<p class="menu-label">
							Menu
						</p>
						<ul class="menu-list">
							<li><a href="dashboard.html"><span class="icon"><i class="fa fa-tachometer"></i></span>Dashboard</a></li>
							<li><a class="is-active" href="books.html"><span class="icon"><i class="fa fa-book"></i></span>Books</a>
							</li>
							<li><a href="customers.html"><span class="icon"><i class="fa fa-address-book"></i></span>Customers</a>
							</li>
							<li><a href="orders.html"><span class="icon"><i class="fa fa-file-text-o"></i></span>Orders</a></li>
						</ul>
					</nav>
				</div>
				<div class="column">
					<!-- The right part, specific to each page -->
				</div>
			</div>
		</section>
		<section class="section">
			<h1 class="title">Books</h1>

			<nav class="level">
				<div class="level-left">
					<div class="level-item">
						<p class="subtitle is-5">
							<strong>6</strong> books
						</p>
					</div>

					<p class="level-item">
						<a class="button is-success" href="new-book.html">New</a>
					</p>

					<div class="level-item is-hidden-tablet-only">
						<div class="field has-addons">
							<p class="control">
								<input class="input" type="text" placeholder="Book name, ISBN…">
							</p>
							<p class="control">
								<button class="button">
									Search
								</button>
							</p>
						</div>
					</div>
				</div>

				<div class="level-right">
					<div class="level-item">
						Order by
					</div>
					<div class="level-item">
						<div class="select">
							<select>
								<option>Publish date</option>
								<option>Price</option>
								<option>Page count</option>
							</select>
						</div>
					</div>
				</div>
			</nav>
		</section>
		<article class="box">
			<div class="media">
				<aside class="media-left">
				</aside>

				<div class="media-content">
					<p class="title is-5 is-spaced is-marginless">
						<a href="edit-book.html">
							TensorFlow For Machine Intelligence
						</a>
					</p>
					<p class="subtitle is-marginless">
						$22.99
					</p>
					<div class="content is-small">
						270 pages
						<br>
						ISBN: 9781939902351
						<br>
						<a href="edit-book.html">Edit</a>
						<span>·</span>
						<a>Delete</a>
					</div>
				</div>
			</div>
		</article>
		<section class="section">
			<nav class="pagination">
				<a class="pagination-previous">Previous</a>
				<a class="pagination-next">Next page</a>
				<ul class="pagination-list">
					<li>
						<a class="pagination-link">1</a>
					</li>
					<li>
						<span class="pagination-ellipsis">&hellip;</span>
					</li>
					<li>
						<a class="pagination-link">45</a>
					</li>
					<li>
						<a class="pagination-link is-current">46</a>
					</li>
					<li>
						<a class="pagination-link">47</a>
					</li>
					<li>
						<span class="pagination-ellipsis">&hellip;</span>
					</li>
					<li>
						<a class="pagination-link">86</a>
					</li>
				</ul>
			</nav>
		</section>
		<section class="section">
			<nav class="breadcrumb">
				<ul>
					<li>
						<a href="books.html">Books</a>
					</li>
					<li class="is-active">
						<a href="new-book.html">New book</a>
					</li>
				</ul>
			</nav>
		</section>
		<section class="section">
			<form>
				<div class="field">
					<div class="field">
						<label class="label">Title</label>
						<div class="control">
							<input class="input is-large" type="text" placeholder="e.g. Designing with Bulma" required>
						</div>
					</div>
				</div>
			</form>
		</section>
		<section class="section">
			<div class="columns is-desktop">
				<div class="column">
					<label class="label">Price</label>
					<div class="control has-icons-left">
						<input class="input" type="number" placeholder="e.g. 22.99" required>
						<span class="icon is-small is-left">
        <i class="fa fa-dollar"></i>
      </span>
					</div>
				</div>

				<div class="column">
					<label class="label">Pages</label>
					<div class="control">
						<input class="input" type="number" placeholder="e.g. 270" required>
					</div>
				</div>

				<div class="column">
					<label class="label">ISBN</label>
					<div class="control">
						<input class="input" type="text" placeholder="e.g. 9781939902351" required>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="field">
				<label class="label">Cover image</label>
				<div class="control">
					<div class="file has-name">
						<label class="file-label">
							<input class="file-input" type="file">
							<span class="file-cta">
          <span class="file-icon">
            <i class="fa fa-upload"></i>
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
							<span class="file-name">
          No file chosen
        </span>
						</label>
					</div>
				</div>
			</div>
		</section>
		<section name="show-section" class="section">
			<div class="level-right">
				<p class="level-item"><strong>All</strong></p>
				<p class="level-item"><a>With orders</a></p>
				<p class="level-item"><a>Without orders</a></p>
			</div>
			<table class="table is-hoverable is-fullwidth">
				<thead>
				<tr>
					<th class="is-narrow">
						<input type="checkbox">
					</th>
					<th>Name</th>
					<th>Email</th>
					<th>Country</th>
					<th>Orders</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>
						<input type="checkbox">
					</td>
					<td>
						<a href="edit-customer.html">
							<strong>John Miller</strong>
						</a>
					</td>
					<td><code>johnmiller@gmail.com</code></td>
					<td>United States</td>
					<td>
						<a href="customer-orders.html">2</a>
					</td>
					<td>
						<div class="buttons">
							<a class="button is-small" href="edit-customer.html">Edit</a>
							<a class="button is-small">Delete</a>
						</div>
					</td>
				</tr>
				</tbody>
			</table>
		</section>

		<section name="buy-section" class="section">
			<p class="heading">
				<strong>Books</strong>
			</p>
			<table class="table is-bordered is-fullwidth">
				<thead>
				<tr>
					<th class="is-narrow">Cover</th>
					<th>Title</th>
					<th class="has-text-right is-narrow">Price</th>
					<th class="has-text-right is-narrow">Amount</th>
					<th class="has-text-right is-narrow">Total</th>
				</tr>
				</thead>
				<tfoot>
				<tr>
					<th colspan="5" class="has-text-right">$42.98</th>
				</tr>
				</tfoot>
				<tbody>
				<tr>
					<td>
					</td>
					<td>
						<a href="edit-book.html">
							<strong>
								TensorFlow For Machine Intelligence
							</strong>
						</a>
					</td>
					<td class="has-text-right">
						$22.99
					</td>
					<td class="has-text-right">
						<input class="input is-small" type="number" value="1" maxlength="2" max="2">
					</td>
					<td class="has-text-right">
						$22.99
					</td>
				</tr>
				<tr>
					<td>
					</td>
					<td>
						<a href="edit-book.html">
							<strong>
								Choosing a JavaScript Framework
							</strong>
						</a>
					</td>
					<td class="has-text-right">
						$19.99
					</td>
					<td class="has-text-right">
						<input class="input is-small" type="number" value="1" maxlength="2" max="2">
					</td>
					<td class="has-text-right">
						$19.99
					</td>
				</tr>
				</tbody>
			</table>
		</section>

		<section class="section">
			<div class="columns is-multiline">
				<div class="column is-12-tablet is-6-desktop is-3-widescreen">
					<div class="notification is-link has-text">
						<p class="title is-1">232</p>
						<p class="subtitle is-4">Orders</p>
					</div>
				</div>

				<div class="column is-12-tablet is-6-desktop is-3-widescreen">
					<div class="notification is-info has-text">
						<p class="title is-1">$7,648</p>
						<p class="subtitle is-4">Revenue</p>
					</div>
				</div>

				<div class="column is-12-tablet is-6-desktop is-3-widescreen">
					<div class="notification is-primary has-text">
						<p class="title is-1">1,678</p>
						<p class="subtitle is-4">Visitors</p>
					</div>
				</div>

				<div class="column is-12-tablet is-6-desktop is-3-widescreen">
					<div class="notification is-success has-text">
						<p class="title is-1">20,756</p>
						<p class="subtitle is-4">Pageviews</p>
					</div>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="column is-12-tablet is-6-desktop is-4-fullhd">
				<div class="card">
					<div class="card-content">
						<h2 class="title is-4">
							Latest orders
						</h2>

						<div class="level">
							<div class="level-left">
								<div>
									<p class="title is-5 is-marginless">
										<a href="edit-order.html">787352</a>
									</p>
									<small>
										Nov 18, 17:38 by <a href="edit-customer.html">John Miller</a>
									</small>
								</div>
							</div>
							<div class="level-right">
								<div class="has-text-right">
									<p class="title is-5 is-marginless">
										$56.98
									</p>
									<span class="tag is-warning">In progress</span>
								</div>
							</div>
						</div>

						<a class="button is-link is-outlined" href="orders.html">View all orders</a>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="column is-12-tablet is-6-desktop is-4-fullhd">
				<div class="card">
					<div class="card-content">
						<h2 class="title is-4">
							Most popular books
						</h2>

						<div class="media">
							<div class="media-left is-marginless">
								<p class="number">1</p>
							</div>
							<div class="media-left">
							</div>
							<div class="media-content">
								<p class="title is-5 is-spaced is-marginless">
									<a href="edit-book.html">Learning Swift</a>
								</p>
							</div>
							<div class="media-right">
								146 sold
							</div>
						</div>

						<a class="button is-link is-outlined" href="books.html">View all books</a>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="column is-12-tablet is-6-desktop is-4-fullhd">
				<div class="card">
					<div class="card-content">
						<h2 class="title is-4">
							Most loyal customers
						</h2>

						<div class="media">
							<div class="media-left is-marginless">
								<p class="number">1</p>
							</div>
							<div class="media-content">
								<p class="title is-5 is-spaced is-marginless">
									<a href="edit-customer.html">John Miller</a>
								</p>
								<p class="subtitle is-6">
									United States
								</p>
							</div>
							<div class="media-right">
								7 orders
							</div>
						</div>

						<a class="button is-link is-outlined" href="customers.html">View all customers</a>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="level">
				<div class="level-left">
					<h1 class="subtitle is-3">
						<span class="has-text-grey-light">Hello</span> <strong>Alex Johnson</strong>
					</h1>
				</div>
				<div class="level-right">
					<div class="select">
						<select>
							<option>Today</option>
							<option>Yesterday</option>
							<option>This Week</option>
							<option selected>This Month</option>
							<option>This Year</option>
							<option>All time</option>
						</select>
					</div>
				</div>
			</div>
		</section>
		<section class="section">

			<div class="field has-addons">
				<div class="control is-expanded">
					<div class="select is-fullwidth">
						<select name="country">
							<option value="Argentina">Argentina</option>
							<option value="Bolivia">Bolivia</option>
							<option value="Brazil">Brazil</option>
							<option value="Chile">Chile</option>
							<option value="Colombia">Colombia</option>
							<option value="Ecuador">Ecuador</option>
							<option value="Guyana">Guyana</option>
							<option value="Paraguay">Paraguay</option>
							<option value="Peru">Peru</option>
							<option value="Suriname">Suriname</option>
							<option value="Uruguay">Uruguay</option>
							<option value="Venezuela">Venezuela</option>
						</select>
					</div>
				</div>
				<div class="control">
					<button type="submit" class="button is-primary">Choose</button>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label">From</label>
				</div>
				<div class="field-body">
					<div class="field">
						<p class="control is-expanded has-icons-left">
							<input class="input" type="text" placeholder="Name">
							<span class="icon is-small is-left">
          <i class="fa fa-user"></i>
        </span>
						</p>
					</div>
					<div class="field">
						<p class="control is-expanded has-icons-left has-icons-right">
							<input class="input is-success" type="email" placeholder="Email" value="alex@smith.com">
							<span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
							<span class="icon is-small is-right">
          <i class="fa fa-check"></i>
        </span>
						</p>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label"></div>
				<div class="field-body">
					<div class="field is-expanded">
						<div class="field has-addons">
							<p class="control">
								<a class="button is-static">
									+44
								</a>
							</p>
							<p class="control is-expanded">
								<input class="input" type="tel" placeholder="Your phone number">
							</p>
						</div>
						<p class="help">Do not enter the first zero</p>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label">Department</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control">
							<div class="select is-fullwidth">
								<select>
									<option>Business development</option>
									<option>Marketing</option>
									<option>Sales</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label">
					<label class="label">Already a member?</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control">
							<label class="radio">
								<input type="radio" name="member">
								Yes
							</label>
							<label class="radio">
								<input type="radio" name="member">
								No
							</label>
						</div>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label">Subject</label>
				</div>
				<div class="field-body">
					<div class="field">
						<div class="control">
							<input class="input is-danger" type="text" placeholder="e.g. Partnership opportunity">
						</div>
						<p class="help is-danger">
							This field is required
						</p>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label">Question</label>
				</div>
				<div class="field-body">
					<div class="field">
						<div class="control">
							<textarea class="textarea" placeholder="Explain how we can help you"></textarea>
						</div>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-label">
					<!-- Left empty for spacing -->
				</div>
				<div class="field-body">
					<div class="field">
						<div class="control">
							<button class="button is-primary">
								Send message
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="select is-multiple">
				<select multiple size="8">
					<option value="Argentina">Argentina</option>
					<option value="Bolivia">Bolivia</option>
					<option value="Brazil">Brazil</option>
					<option value="Chile">Chile</option>
					<option value="Colombia">Colombia</option>
					<option value="Ecuador">Ecuador</option>
					<option value="Guyana">Guyana</option>
					<option value="Paraguay">Paraguay</option>
					<option value="Peru">Peru</option>
					<option value="Suriname">Suriname</option>
					<option value="Uruguay">Uruguay</option>
					<option value="Venezuela">Venezuela</option>
				</select>
			</div>
		</section>
		<section class="section">
			<div class="field">
				<div class="control has-icons-left">
					<div class="select is-large">
						<select>
							<option selected>Country</option>
							<option>Select dropdown</option>
							<option>With options</option>
						</select>
					</div>
					<div class="icon is-large is-left">
						<i class="fa fa-globe"></i>
					</div>
				</div>
			</div>
		</section>
		<el-upload
			class="upload-demo"
			action="https://jsonplaceholder.typicode.com/posts/"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:file-list="fileList"
			list-type="picture">
			<el-button size="small" type="primary">Click to upload</el-button>
			<div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
		</el-upload>
	</div>
</template>

<script>
	import rf from '../utils/requests/RequestFactory';
	import TreeNavigation from "../components/common/TreeNavigation";

	export default {
		async asyncData ({ app }) {
		},
		components: { TreeNavigation },
		data() {
			return {
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				product: null,
				navbar: [],
			};
		},
		// async mounted () {
		// 	const { data } = await this.getNavigators();
		// 	console.log(data, 'data');
		// 	this.navbar = data;
		// },
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			...rf.getBehaviors('CommonBehavior')
		},
	}
</script>

<style>
</style>

